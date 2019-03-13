IBM Mobile Foundation
===
## WorklistAdapter
An adapter that works on a "worklist" item stored directly in a Cloudant database.


### Usage
#### Adapter setup
1. Create a database in Cloudant and generate an API key. Make sure that you provide read and write rights for this key.
2. To connect to Cloudant, update the Cloudant configuration:

   
   * CloudantJava:
      - go to `WorklistAdapter/Adapter` and execte `mvn install`
      - Deploy the adapter `worklist.adapter` from `target/adapter`
      - In the **Mobile Foundation Operations Console → [your adapter] → Configurations tab**, replace the `DATABASE_NAME`, `CLOUDANT_ACCOUNT`, `KEY` and `PASSWORD` placeholders with the actual values.



### Supported Levels
IBM MobileFirst Platform Foundation 8.0 +

### License
Copyright 2019 IBM Corp.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
