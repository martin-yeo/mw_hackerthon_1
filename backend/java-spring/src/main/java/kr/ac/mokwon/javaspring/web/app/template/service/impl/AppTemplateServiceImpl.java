package kr.ac.mokwon.javaspring.web.app.template.service.impl;

import kr.ac.mokwon.javaspring.web.app.template.dao.impl.AppTemplateDAOImpl;
import kr.ac.mokwon.javaspring.web.app.template.service.AppTemplateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AppTemplateServiceImpl implements AppTemplateService {

	@Autowired
	private AppTemplateDAOImpl appTemplateDaoImpl;

	@Override
	public Map<String, Object> selectTemplateListService(HashMap<String, Object> dataMap) {
		Map<String, Object> resultMap = new HashMap<String, Object>();

		try {
			List<Map<String, Object>> templateList = appTemplateDaoImpl.selectTemplateList(dataMap);

			resultMap.put("result", true);
			resultMap.put("list", templateList);
			resultMap.put("code", HttpStatus.OK);
		} catch(Exception e) {
			e.printStackTrace();
			resultMap.put("result", false);
			resultMap.put("code", HttpStatus.INTERNAL_SERVER_ERROR);
			resultMap.put("msg", "내부 서버 오류입니다.");
		}


		return resultMap;
	}

	@Override
	public Map<String, Object> selectOneTemplateService(HashMap<String, Object> dataMap) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		try {
			Map<String, Object> data = appTemplateDaoImpl.selectOneTemplate(dataMap);

			resultMap.put("result", true);
			resultMap.put("data", data);
			resultMap.put("code", HttpStatus.OK);
		} catch(Exception e) {
			e.printStackTrace();
			resultMap.put("result", false);
			resultMap.put("code", HttpStatus.INTERNAL_SERVER_ERROR);
			resultMap.put("msg", "내부 서버 오류입니다.");
		}

		return resultMap;
	}

	@Override
	public Map<String, Object> insertTemplateService(HashMap<String, Object> dataMap) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		try {
			int result = appTemplateDaoImpl.insertTemplateData(dataMap);

			if(result == 1) {
				resultMap.put("result", true);
			} else {
				resultMap.put("result", false);
			}

			resultMap.put("code", HttpStatus.OK);
		} catch(Exception e) {
			e.printStackTrace();
			resultMap.put("result", false);
			resultMap.put("code", HttpStatus.INTERNAL_SERVER_ERROR);
			resultMap.put("msg", "내부 서버 오류입니다.");
		}

		return resultMap;
	}

	@Override
	public Map<String, Object> updateTemplateService(HashMap<String, Object> dataMap) {
		Map<String, Object> resultMap = new HashMap<String, Object>();

		try {
			int result = appTemplateDaoImpl.updateTemplateData(dataMap);

			if(result == 1) {
				resultMap.put("result", true);
			} else {
				resultMap.put("result", false);
			}

			resultMap.put("code", HttpStatus.OK);
		} catch(Exception e) {
			e.printStackTrace();
			resultMap.put("result", false);
			resultMap.put("code", HttpStatus.INTERNAL_SERVER_ERROR);
			resultMap.put("msg", "내부 서버 오류입니다.");
		}

		return resultMap;
	}

	@Override
	public Map<String, Object> deleteTemplateService(HashMap<String, Object> dataMap) {
		Map<String, Object> resultMap = new HashMap<String, Object>();

		try {
			int result = appTemplateDaoImpl.deleteTemplateData(dataMap);

			if(result == 1) {
				resultMap.put("result", true);
			} else {
				resultMap.put("result", false);
			}

			resultMap.put("code", HttpStatus.OK);
		} catch(Exception e) {
			e.printStackTrace();
			resultMap.put("result", false);
			resultMap.put("code", HttpStatus.INTERNAL_SERVER_ERROR);
			resultMap.put("msg", "내부 서버 오류입니다.");
		}

		return resultMap;
	}
}