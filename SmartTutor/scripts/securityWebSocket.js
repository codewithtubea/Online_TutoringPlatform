const WebSocket = require('ws');
const jwt = require('jsonwebtoken');

class SecurityWebSocketServer {
    constructor(port = 8080) {
        this.wss = new WebSocket.Server({ port });
        this.clients = new Map(); // Map WebSocket connections to user data

        this.wss.on('connection', this.handleConnection.bind(this));
        console.log(`WebSocket server started on port ${port}`);
    }

    handleConnection(ws, req) {
        console.log('New client connected');

        ws.on('message', async(message) => {
            try {
                const data = JSON.parse(message);

                switch (data.type) {
                    case 'authenticate':
                        this.handleAuthentication(ws, data.token);
                        break;
                    case 'subscribe':
                        this.handleSubscription(ws, data.channels);
                        break;
                    case 'security_alert':
                        this.broadcastSecurityAlert(data.data);
                        break;
                }
            } catch (error) {
                console.error('Error processing message:', error);
                ws.send(JSON.stringify({
                    type: 'error',
                    message: 'Invalid message format'
                }));
            }
        });

        ws.on('close', () => {
            this.clients.delete(ws);
            console.log('Client disconnected');
        });

        // Send initial connection acknowledgment
        ws.send(JSON.stringify({
            type: 'connection',
            message: 'Connected to security notification server'
        }));
    }

    async handleAuthentication(ws, token) {
        try {
            // Verify JWT token (use same secret as API)
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            this.clients.set(ws, {
                userId: decoded.sub,
                role: decoded.role,
                subscriptions: []
            });

            ws.send(JSON.stringify({
                type: 'auth_success',
                message: 'Authentication successful'
            }));
        } catch (error) {
            ws.send(JSON.stringify({
                type: 'auth_error',
                message: 'Authentication failed'
            }));
            ws.close();
        }
    }

    handleSubscription(ws, channels) {
        const client = this.clients.get(ws);
        if (!client) return;

        client.subscriptions = channels;
        this.clients.set(ws, client);

        ws.send(JSON.stringify({
            type: 'subscription_update',
            channels: channels
        }));
    }

    broadcastSecurityAlert(alert) {
        const criticalEvents = new Set([
            'brute_force_attempt',
            'suspicious_ip',
            'account_locked',
            'admin_action'
        ]);

        this.clients.forEach((client, ws) => {
            // Only send to authenticated admin users
            if (client.role === 'admin') {
                // For critical events, send regardless of subscription
                if (criticalEvents.has(alert.type) ||
                    client.subscriptions.includes('security_alerts')) {
                    ws.send(JSON.stringify({
                        type: 'security_alert',
                        data: alert
                    }));
                }
            }
        });
    }

    broadcastToRole(role, message) {
        this.clients.forEach((client, ws) => {
            if (client.role === role) {
                ws.send(JSON.stringify(message));
            }
        });
    }
}

// Start the server
const server = new SecurityWebSocketServer(process.env.WS_PORT || 8080);