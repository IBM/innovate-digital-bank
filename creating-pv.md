# Creating Persistent Volume in ICP

We will be using a persisten volume to deploy mongo db for our application.

To create a Persisten Volume 
1. Navigate to Menu > Platform > Storage
![console](doc/source/images/pv1.png) 
![menu](doc/source/images/pv2.png)

2. Select `Create Persistent Volume` 
![Persistent Volume](doc/source/images/pv3.png)

3. In General set name, capacity, access type, storage type.
For our use case we will create a persisten volume with name `mongo-pv`, `5 gb` capacity with `Read write many` access mode and storage type `Host Path`
![setting 1](doc/source/images/pv4.png)
![setting 2](doc/source/images/pv5.png)

4. In Parameter set `key` to `/renovate`
![setting 3](doc/source/images/pv6.png)

5. Click create.