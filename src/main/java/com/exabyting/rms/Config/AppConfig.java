package com.exabyting.rms.Config;


import com.exabyting.rms.Services.Implementation.OAuth2ServiceImplementation;
import jakarta.servlet.http.HttpServletRequest;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.Collections;
import java.util.List;

@Configuration
@EnableMethodSecurity(prePostEnabled = true)
public class AppConfig {

    @Autowired
    private OAuth2ServiceImplementation oAuth2ServiceImplementation;


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http.csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(s->s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(authreq->
                        authreq.requestMatchers("/api/v1/auth/login").permitAll()
                                .requestMatchers("api/v1/users/signup").permitAll()
                                .anyRequest()
                                .permitAll())

                .addFilterBefore(new JwtTokenValidator(), UsernamePasswordAuthenticationFilter.class)
                .oauth2Login(oauth2Login ->
                        oauth2Login
                                .loginPage("/oauth2/authorization/github")
                                .defaultSuccessUrl("/api/v1/home", true)
                                .failureUrl("/login?error=true")
                                .userInfoEndpoint(userInfo->
                                        userInfo.userService(oAuth2ServiceImplementation))
                )
                .cors((cor)->cor.configurationSource(
                        new CorsConfigurationSource() {
                            @Override
                            public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
                                CorsConfiguration corsConfiguration = new CorsConfiguration();
                                corsConfiguration.setAllowedOrigins(
                                        List.of("http://localhost:5173/","http://localhost:3000/")
                                );
                                corsConfiguration.setAllowedMethods(Collections.singletonList("*"));
                                corsConfiguration.setAllowCredentials(true);
                                corsConfiguration.setAllowedHeaders(Collections.singletonList("*"));
                                corsConfiguration.setExposedHeaders(List.of("Authorization"));
                                corsConfiguration.setMaxAge(3600L);
                                return corsConfiguration;
                            }
                        }
                ))
        ;


        return http.build();

    }





    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public ModelMapper modelMapper(){
        return new ModelMapper();
    }


}
