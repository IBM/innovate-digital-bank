# Create Persistent Volume Claim in ICP

To create persistent volume claim in IBM Cloud Private

1. After you have created a persistent volume, click on the `Persistent Volume Claim` tab.
![pvc](doc/source/images/pvc1.png)

2. Click on `Create PersistentVolumeClaim` button
![click](doc/source/images/pvc2.png)

3. Select a name, storage request and access mode. 
For our case we are going with `mongo-pvc`, `1 Gb` and `Read write many`
![setting 1](doc/source/images/pvc3.png)
![setting 2](doc/source/images/pvc4.png)

4. Click Create.