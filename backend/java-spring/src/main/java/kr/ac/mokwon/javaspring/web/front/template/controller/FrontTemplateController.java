package kr.ac.mokwon.javaspring.web.front.template.controller;

import kr.ac.mokwon.javaspring.web.front.template.service.impl.FrontTemplateServiceImpl;
import kr.ac.mokwon.javaspring.web.util.gson.GsonUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("/api/front") // URL 주소 표현
public class FrontTemplateController {

    @Autowired
    private FrontTemplateServiceImpl frontTemplateServiceImpl;

    @ResponseBody
    @RequestMapping(value = "/list", method=RequestMethod.POST) // URL 주소 표현, POST 전송 받음
    public ResponseEntity<Object> templateList(
        @RequestBody HashMap<String, Object> dataMap
    ) {
        Map<String, Object> resultMap = frontTemplateServiceImpl.selectTemplateListService(dataMap);

        return new ResponseEntity<Object>(GsonUtil.toJson(resultMap), HttpStatus.OK);
    }

    @ResponseBody
    @RequestMapping(value = "/one/{num}", method=RequestMethod.POST)
    public ResponseEntity<Object> templateDetail(
        @RequestBody HashMap<String, Object> dataMap
    ) {
        Map<String, Object> resultMap = frontTemplateServiceImpl.selectOneTemplateService(dataMap);

        return new ResponseEntity<Object>(GsonUtil.toJson(resultMap), HttpStatus.OK);
    }

    @ResponseBody
    @RequestMapping(value = "/insert", method=RequestMethod.POST)
    public ResponseEntity<Object> insertTemplateData(
        @RequestBody HashMap<String, Object> dataMap
    ) {
        Map<String, Object> resultMap = frontTemplateServiceImpl.insertTemplateService(dataMap);

        return new ResponseEntity<Object>(GsonUtil.toJson(resultMap), HttpStatus.OK);
    }

    @ResponseBody
    @RequestMapping(value = "/update", method=RequestMethod.POST)
    public ResponseEntity<Object> updateTemplateData(
        @RequestBody HashMap<String, Object> dataMap
    ) {
        Map<String, Object> resultMap = frontTemplateServiceImpl.updateTemplateService(dataMap);

        return new ResponseEntity<Object>(GsonUtil.toJson(resultMap), HttpStatus.OK);
    }

    @ResponseBody
    @RequestMapping(value = "/delete", method=RequestMethod.POST)
    public ResponseEntity<Object> deleteTemplateData(
        @RequestBody HashMap<String, Object> dataMap
    ) {
        Map<String, Object> resultMap = frontTemplateServiceImpl.deleteTemplateService(dataMap);

        return new ResponseEntity<Object>(GsonUtil.toJson(resultMap), HttpStatus.OK);
    }

}