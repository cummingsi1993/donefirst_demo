# donefirst_demo

## Instructions for starting

- `docker-compose up --build`

## Configure Couchbase
- Unfortunately i didnt spend the time automating the couchbase setup so this part will have to be done manually. 
- Navigate to 'localhost:8091'
  - Click 'Setup New Cluster' ![setup](./readme_extras/couchbase_configure_cluster.png)
  - Fill out cluster information 
    - Cluster Name: donefirst_demo
    - Username: Administrator
    - Password: Password
  - Accept Terms ![accept](./readme_extras/accept_terms.png)
  - Save and finish ![save](./readme_extras/save.png)
  - Add Bucket ![add_bucket](./readme_extras/add_bucket.png)
    - Bucket Name: patient_registration
    - Save ![save](./readme_extras/save_bucket.png)
  - Click 'Query' ![query](./readme_extras/query.png)
    - Paste this primary index in the query editor and click 'Execute' : ```CREATE PRIMARY INDEX `#primary` ON `patient_registration```

## Navigate to the web app
- Navigate to 'localhost:5200'
- The sandwich icon in the top right will take you to the registration or administration pages ![side_panel](./readme_extras/sidePanelOpen.png)
- Registration: ![registration](./readme_extras/register.png)
- Admin: ![admin](./readme_extras/Admin.png)

## Notes

- I wouldnt do this in a production system, but for ease of showcasing i included the couchbase database in the checked in files. You should have a full functioning system including database and some existing data just from running the docker build.
