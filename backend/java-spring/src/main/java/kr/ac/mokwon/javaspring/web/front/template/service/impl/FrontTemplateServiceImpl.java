package kr.ac.mokwon.javaspring.web.front.template.service.impl;

import kr.ac.mokwon.javaspring.web.front.template.dao.impl.FrontTemplateDAOImpl;
import kr.ac.mokwon.javaspring.web.front.template.service.FrontTemplateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class FrontTemplateServiceImpl implements FrontTemplateService {

	@Autowired
	private FrontTemplateDAOImpl frontTemplateDaoImpl;

	@Override
	public Map<String, Object> selectTemplateListService(HashMap<String, Object> dataMap) {
		Map<String, Object> resultMap = new HashMap<String, Object>();

		try {
			List<Map<String, Object>> templateList = frontTemplateDaoImpl.selectTemplateList(dataMap);

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
			Map<String, Object> data = frontTemplateDaoImpl.selectOneTemplate(dataMap);

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
			int result = frontTemplateDaoImpl.insertTemplateData(dataMap);

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
			int result = frontTemplateDaoImpl.updateTemplateData(dataMap);

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
			int result = frontTemplateDaoImpl.deleteTemplateData(dataMap);

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