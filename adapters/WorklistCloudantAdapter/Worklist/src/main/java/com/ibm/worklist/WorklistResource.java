/**
* Copyright 2015 IBM Corp.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
package com.ibm.worklist;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.ibm.json.java.JSONObject;
import com.ibm.mfp.adapter.api.AdaptersAPI;
import com.ibm.mfp.adapter.api.OAuthSecurity;

import org.lightcouch.NoDocumentException;
import com.cloudant.client.api.Database;
  

@Path("/workitems")
@OAuthSecurity(enabled = true)
public class WorklistResource {
	/*
	 * For more info on JAX-RS see https://jax-rs-spec.java.net/nonav/2.0-rev-a/apidocs/index.html
	 */

	@Context
	AdaptersAPI adaptersAPI;
	
	/* The Cloudant DB Configration */
	private Database getDB() throws Exception {
		System.out.println("in getDB(): "+ adaptersAPI.getJaxRsApplication(WorklistApplication.class));
		WorklistApplication app = adaptersAPI.getJaxRsApplication(WorklistApplication.class);
		if (app.db == null) {
			 app.initConnection();;
		}
		if (app.db != null) {
			return app.db;
		}
		throw new Exception("Unable to connect to Cloudant DB, check the configuration.");
	}


	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public Response addEntry(Workitem workitem) throws Exception {
		System.out.println("in POST");
		if(workitem!=null /*&& user.isValid()*/){
			workitem.setId(null);
			workitem.setRev(null);
			com.cloudant.client.api.model.Response resp = getDB().save(workitem);
			return Response.ok(resp.getId()).build();
		}
		else{
			return Response.status(418).build();
		}
	}
	@PUT
	@Path("/{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	
	public Response updateEntry(@PathParam("id") String id, Workitem newWorkitem) throws Exception {
		System.out.println("in PUT");
		if(newWorkitem!=null /*&& user.isValid()*/){
			Workitem oldUser = getEntryByID(id);
			newWorkitem.setId(oldUser.getId());
			newWorkitem.setRev(oldUser.getRev());
			getDB().update(newWorkitem);
			JSONObject returnObj = new JSONObject();
			returnObj.put("id", id); 
			return Response.ok( returnObj.toString()).build();
		}
		else{
			return Response.status(418).build();
		}
	}

	@DELETE
	@Path("/{id}")
	
	//@OAuthSecurity(scope = "Username_Password")
	public Response deleteEntry(@PathParam("id") String id) throws Exception {
		try{
			Workitem user = getDB().find(Workitem.class, id);
			getDB().remove(user);
			JSONObject returnObj = new JSONObject();
			returnObj.put("id", id); 
			return Response.ok(returnObj.toString()).build();
		}
		catch(NoDocumentException e){
			return Response.status(404).build();
		}
	}

	@GET
	@Produces("application/json")
	public List<Workitem> getAllEntries() throws Exception {
		System.out.println("in GET");
		List<Workitem> entries = getDB().view("_all_docs").includeDocs(true).query(Workitem.class);
		//return Response.ok(entries).build();
		return entries;
	}

	@GET
	@Path("/{id}")
	@Produces("application/json")
	public Workitem getEntryByID(@PathParam("id") String id) throws Exception {
		System.out.println("in GETbyID");
		Workitem user = getDB().find(Workitem.class,id);
		
		return user;
	}

	/* Returns all the open work lists */
	@GET
	@Path("/openEntries")
	@Produces(MediaType.TEXT_PLAIN)
	@OAuthSecurity(enabled = false)
	public String getOpenEntries() throws Exception {
		List<Workitem> entries = getDB().view("_all_docs").includeDocs(true).query(Workitem.class);
		//return Response.ok(entries).build();
		return String.valueOf(entries.size());
	}

}
