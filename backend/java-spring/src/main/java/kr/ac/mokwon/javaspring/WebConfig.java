package kr.ac.mokwon.javaspring;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.PathResourceResolver;

import java.io.IOException;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Autowired
    private ConfigUtility configUtil;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // 모든 경로에 대해 CORS 허용
                .allowedOrigins("*") // 모든 출처 허용
                .allowedMethods("*") // 모든 HTTP 메서드 허용
                .allowedHeaders("*"); // 모든 헤더 허용
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // 리소스 추가하는 패턴, 고정 페이지를 추가하는 경우(resources 폴더 밑에 붙는 내용)
        // front 화면단을 추가하려면 아래의 admin 부분을 front로 변경
        /*
        registry.addResourceHandler("/admin/**")
            .addResourceLocations("classpath:/static/admin/")
            .resourceChain(true)
            .addResolver(new PathResourceResolver() {
                @Override
                protected Resource getResource(String resourcePath, Resource location) throws IOException {
                    Resource requestedResource = location.createRelative(resourcePath);
                    return requestedResource.exists() && requestedResource.isReadable() ? requestedResource
                        : new ClassPathResource("/static/admin/index.html");
                }
            });
        */

        // 업로드 파일에 대하여 접근할 수 있는 레지스트리 작성
        registry.addResourceHandler("/upload/**")
//            .addResourceLocations("classpath:/upload/")
            .addResourceLocations("file:" + configUtil.getProperty("upload_dir"))
            .setCachePeriod(20)
        ;

        // 리소스 추가하는 패턴(resources 폴더 밑에 붙는 내용)
        /*
        registry.addResourceHandler("/images/**")
                .addResourceLocations("classpath:/images/")
                .setCachePeriod(20)
        ;
        */

        // 리소스 추가하는 패턴, 고정 페이지를 추가하는 경우(resources 폴더 밑에 붙는 내용)
        /*
        registry
                .addResourceHandler("/error")
                .addResourceLocations("classpath:/static/front/")
                .resourceChain(true)
                .addResolver(new PathResourceResolver() {
                    @Override
                    protected Resource getResource(String resourcePath, Resource location) throws IOException {
                        Resource requestedResource = location.createRelative(resourcePath);
                        return requestedResource.exists() && requestedResource.isReadable() ? requestedResource
                                : new ClassPathResource("/static/front/index.html");
                    }
                });

        registry.addResourceHandler("/withdraw")
                .addResourceLocations("classpath:/static/withdraw/")
                .resourceChain(true)
                .addResolver(new PathResourceResolver() {
                    @Override
                    protected Resource getResource(String resourcePath, Resource location) throws IOException {
                        Resource requestedResource = location.createRelative(resourcePath);
                        return requestedResource.exists() && requestedResource.isReadable() ? requestedResource
                                : new ClassPathResource("/static/withdraw/index.html");
                    }
                });
       */
    }
}