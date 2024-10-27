package kr.ac.mokwon.javaspring.web.app.template.dao.impl;

import kr.ac.mokwon.javaspring.web.app.template.dao.AppTemplateDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Transactional
@Repository
public class AppTemplateDAOImpl implements AppTemplateDAO {
	@Autowired
	private AppTemplateDAO appTemplateDAO;

	@Override
	public List<Map<String, Object>> selectTemplateList(Map<String, Object> m) {
		return appTemplateDAO.selectTemplateList(m);
	}

	@Override
	public Map<String, Object> selectOneTemplate(Map<String, Object> m) {
		return appTemplateDAO.selectOneTemplate(m);
	}

	@Override
	public int insertTemplateData(Map<String, Object> m) {
		return appTemplateDAO.insertTemplateData(m);
	}

	@Override
	public int updateTemplateData(Map<String, Object> m) {
		return appTemplateDAO.updateTemplateData(m);
	}

	@Override
	public int deleteTemplateData(Map<String, Object> m) {
		return appTemplateDAO.deleteTemplateData(m);
	}
}