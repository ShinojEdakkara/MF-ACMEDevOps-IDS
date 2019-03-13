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

import io.swagger.annotations.ApiModelProperty;

public class Workitem {
	private String description, location, notes, _id;

	@ApiModelProperty(hidden=true)
	private String _rev;
	
	private Boolean completed = false;

	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	
	
	public String getLocation() {
		return location;
	}
	public void setLocation(String location) {
		this.location = location;
	}

	public String getNotes() {
		return notes;
	}
	public void setNotes(String notes) {
		this.notes = notes;
	}

	public Boolean getCompleted() {
		return completed;
	}
	public void setCompleted(Boolean completed) {
		this.completed = completed;
	}

	public String getId() {
		return _id;
	}
	public void setId(String _id) {
		this._id = _id;
	}
	
	public String getRev() {
		return _rev;
	}
	public void setRev(String _rev) {
		this._rev = _rev;
	}


}
