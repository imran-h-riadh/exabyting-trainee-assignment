package com.exabyting.rms.Services.Implementation;

import com.exabyting.rms.DTOs.UserDto;
import com.exabyting.rms.Entities.Helper.Role;
import com.exabyting.rms.Entities.User;
import com.exabyting.rms.Repositories.UserRepository;
import com.exabyting.rms.Services.UserServices;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class OAuth2ServiceImplementation extends DefaultOAuth2UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserServices userServices;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest oAuth2UserRequest) {
        log.trace("Load user {}", oAuth2UserRequest);
        OAuth2User oAuth2User = super.loadUser(oAuth2UserRequest);
        return processOAuth2User(oAuth2UserRequest, oAuth2User);
    }

    private OAuth2User processOAuth2User(OAuth2UserRequest oAuth2UserRequest, OAuth2User oAuth2User) {
        UserDto userInfoDto = UserDto
                .builder()
                .name(oAuth2User.getAttributes().get("name").toString())
//                .email(oAuth2User.getAttributes().get("email").toString())
                .email("tete@gmail.com")
                .password("github")
                .roles(List.of(Role.APPLICANT))
                .build();

        System.out.println(oAuth2User.getAttributes().get("name").toString());

        Map<String, Object> attributes = oAuth2User.getAttributes();
        String name = (String) attributes.get("name");
        String login = (String) attributes.get("login");
//        String email = (String) attributes.get("email");
        String avatarUrl = (String) attributes.get("avatar_url");

        User user = userRepository.findByEmail(userInfoDto.getEmail());

        if(user == null){
            UserDto userDto = userServices.create(userInfoDto);
        }


        return new DefaultOAuth2User(oAuth2User.getAuthorities(),attributes,name);
    }


}
