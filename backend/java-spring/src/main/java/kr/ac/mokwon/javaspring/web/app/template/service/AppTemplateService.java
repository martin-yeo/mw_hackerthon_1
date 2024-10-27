package kr.ac.mokwon.javaspring.web.app.template.service;

import java.util.HashMap;
import java.util.Map;

public interface AppTemplateService {
	Map<String, Object> selectTemplateListService(HashMap<String, Object> dataMap);
	Map<String, Object> selectOneTemplateService(HashMap<String, Object> dataMap);
	Map<String, Object> insertTemplateService(HashMap<String, Object> dataMap);
	Map<String, Object> updateTemplateService(HashMap<String, Object> dataMap);
	Map<String, Object> deleteTemplateService(HashMap<String, Object> dataMap);

}