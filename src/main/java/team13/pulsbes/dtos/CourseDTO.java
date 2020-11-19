package team13.pulsbes.dtos;

import lombok.Data;

import javax.persistence.Id;

@Data
public class CourseDTO {

    @Id
    private String id;

    private String name;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
    
    
}
