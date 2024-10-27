package kr.ac.mokwon.javaspring.web.app.template.controller;

import kr.ac.mokwon.javaspring.web.app.template.service.impl.AppTemplateServiceImpl;
import kr.ac.mokwon.javaspring.web.util.gson.GsonUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("/{path}") // URL 주소 표현 
public class AppTemplateController {

    @Autowired
    private AppTemplateServiceImpl appTemplateServiceImpl;

    @ResponseBody
    @RequestMapping(value = "/list", method=RequestMethod.POST) // URL 주소 표현, POST 전송 받음
    public ResponseEntity<Object> templateList(
        @RequestBody HashMap<String, Object> dataMap
    ) {
        Map<String, Object> resultMap = appTemplateServiceImpl.selectTemplateListService(dataMap);

        return new ResponseEntity<Object>(GsonUtil.toJson(resultMap), HttpStatus.OK);
    }

    @ResponseBody
    @RequestMapping(value = "/detail", method=RequestMethod.POST)
    public ResponseEntity<Object> templateDetail(
        @RequestBody HashMap<String, Object> dataMap
    ) {
        Map<String, Object> resultMap = appTemplateServiceImpl.selectOneTemplateService(dataMap);

        return new ResponseEntity<Object>(GsonUtil.toJson(resultMap), HttpStatus.OK);
    }

    @ResponseBody
    @RequestMapping(value = "/insert", method=RequestMethod.POST)
    public ResponseEntity<Object> insertTemplateData(
        @RequestBody HashMap<String, Object> dataMap
    ) {
        Map<String, Object> resultMap = appTemplateServiceImpl.insertTemplateService(dataMap);

        return new ResponseEntity<Object>(GsonUtil.toJson(resultMap), HttpStatus.OK);
    }

    @ResponseBody
    @RequestMapping(value = "/update", method=RequestMethod.POST)
    public ResponseEntity<Object> updateTemplateData(
        @RequestBody HashMap<String, Object> dataMap
    ) {
        Map<String, Object> resultMap = appTemplateServiceImpl.updateTemplateService(dataMap);

        return new ResponseEntity<Object>(GsonUtil.toJson(resultMap), HttpStatus.OK);
    }

    @ResponseBody
    @RequestMapping(value = "/delete", method=RequestMethod.POST)
    public ResponseEntity<Object> deleteTemplateData(
        @RequestBody HashMap<String, Object> dataMap
    ) {
        Map<String, Object> resultMap = appTemplateServiceImpl.deleteTemplateService(dataMap);

        return new ResponseEntity<Object>(GsonUtil.toJson(resultMap), HttpStatus.OK);
    }

}