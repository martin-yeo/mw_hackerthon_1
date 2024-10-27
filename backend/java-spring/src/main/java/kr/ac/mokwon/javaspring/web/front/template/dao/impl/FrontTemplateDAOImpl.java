package kr.ac.mokwon.javaspring.web.front.template.dao.impl;

import kr.ac.mokwon.javaspring.web.front.template.dao.FrontTemplateDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Transactional
@Repository
public class FrontTemplateDAOImpl implements FrontTemplateDAO {
	@Autowired
	private FrontTemplateDAO frontTemplateDAO;

	@Override
	public List<Map<String, Object>> selectTemplateList(Map<String, Object> m) {
		return frontTemplateDAO.selectTemplateList(m);
	}

	@Override
	public Map<String, Object> selectOneTemplate(Map<String, Object> m) {
		return frontTemplateDAO.selectOneTemplate(m);
	}

	@Override
	public int insertTemplateData(Map<String, Object> m) {
		return frontTemplateDAO.insertTemplateData(m);
	}

	@Override
	public int updateTemplateData(Map<String, Object> m) {
		return frontTemplateDAO.updateTemplateData(m);
	}

	@Override
	public int deleteTemplateData(Map<String, Object> m) {
		return frontTemplateDAO.deleteTemplateData(m);
	}
}