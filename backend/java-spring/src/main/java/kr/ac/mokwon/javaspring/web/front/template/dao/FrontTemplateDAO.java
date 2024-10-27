package kr.ac.mokwon.javaspring.web.front.template.dao;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface FrontTemplateDAO {
	List<Map<String, Object>> selectTemplateList(Map<String, Object> m);
	Map<String, Object> selectOneTemplate(Map<String, Object> m);
	int insertTemplateData(Map<String, Object> m);
	int updateTemplateData(Map<String, Object> m);
	int deleteTemplateData(Map<String, Object> m);
}