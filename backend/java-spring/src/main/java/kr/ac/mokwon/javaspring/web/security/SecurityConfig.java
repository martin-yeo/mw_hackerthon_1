package kr.ac.mokwon.javaspring.web.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {
//    @Autowired
//    JwtTokenProvider jwtTokenProvider;

    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().antMatchers(
            "/admin/",
            "/admin/build/**",
            "/admin/style/**",
            "/admin/favicon.png",
            "/api/app/**/*",
            "/api/front/**/*"
        );
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
            .antMatchers("/api/app/**/*").permitAll()
            .antMatchers("/api/front/**/*").permitAll()
            .antMatchers("/terms").permitAll()
            .antMatchers("/privacy").permitAll()
            .antMatchers("/admin").permitAll()
            .antMatchers("/admin/").permitAll()
            .antMatchers("/api/admin/auth").permitAll()
            .antMatchers("/api/admin/**/*").authenticated();

        http.logout()
            .logoutRequestMatcher(new AntPathRequestMatcher("/admin/logout"))
            .logoutSuccessUrl("/admin")
            .invalidateHttpSession(true);

        http.exceptionHandling()
            .accessDeniedPage("/admin/denied");

//        http.csrf().disable();
        http.csrf().csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse());

//        http.apply(new JwtTokenFilterConfigurer(jwtTokenProvider));
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
}