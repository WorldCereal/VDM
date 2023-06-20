VDM client side application is running on port 9000 and expect backend application to sits on /backend path
VDM server side application (backend) is running on port 9850

VDM server side application need access to postgresql server with super admin rights and redis server

VDM client side application using React router, so, every path except /backend should point to index.html on /