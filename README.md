# Why Lambda as HTTP Server
This is really a valid question to ask. I had a unique challenge of having a static web site connecting to a API server. 

Here API Server I mean is not AWS API Gateway. This API server shown in the diagram is a traditional Java EE server running in EC2 instance behind ALB. API's hosted in this server is accessed by a mondern static website that is using Single Page Architecture. 

However, API server (running in EC2 instance) is proprietary and cannot enable CORS in that server. One way I thought about this is having a Lambda based HTTP Server behind the same AWS ALB that serves API server traffic. 

Another advantage I see with this approach is that, suppose the hosted static website requires SaaS support, that is each customer can customize the look and feel. Then we need some dynamic association of style scripts based on the tenant. This lmabda can hold that logic as well. 

# High Level Architecture where this Lambda HTTP server can be used
![image info](./img/LambdaServer.png)
# Drawback 
Maximum payload size for AWS function is 256KB. So the static website that is served by this lamnda cannot have a file size > 256KB. 
