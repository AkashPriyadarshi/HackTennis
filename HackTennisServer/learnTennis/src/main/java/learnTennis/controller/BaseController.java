package learnTennis.controller;

import java.util.Map;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class BaseController {

	@RequestMapping({"/","/home"})
	public String testConnection(Map<String, Object> model) {
		return  "index";
	}
	
	public String processImage() {
		return "";
	}

}
