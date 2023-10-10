package org.iclass.rest.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Arrays;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class BookUser {
	private int r;

	/* @Pattern : 유효성 검증 패턴.
	*  @NotEmpty @Size(min=10) 애노테이션 대신에
	*  regexp 속성에는 정규식, message 속성은 오류메시지
	*  @Pattearn 검사는 Controller 에서 @Valid 로 합니다.
	*  입력값이 유효성 검증 오류가 생기면 처리방법은 Spring AOP (부가기능은 분리해서)
	*  모듈을 사용. advice 클래스(부가기능 구현 클래스) 로 실행합니다.
	*  CustomRestAdvice.java --> @ExceptionHandler 어노테이션으로 BindException 처리하도록 함.
	*  유효성 검증 오류에 대한 정보를 갖는 BindingResult 객체를 활용 */

	@Pattern(regexp = "^[a-zA-Z][a-zA-Z0-9._]{3,11}$",message = "아이디: 첫글자 영문,숫자와 기호 ._ 포함 4~12 글자로 하세요.")
	private String id;

	@Pattern(regexp = "^[a-zA-Z가-힣]{2,}$",message = "이름: 영대소문자와 한글만 가능 2글자 이상으로 하세요.")
	private String name;

	@Pattern(regexp = "^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}(\\.[a-zA-Z]{2,})?$"
			,message = "이메일: 작성규칙이 올바르지 않습니다.")
	private String email;

	@Pattern(regexp = "^\\d{4}-\\d{2}-\\d{2}$",message = "YYYY-MM-DD 형식으로 입력하세요.")
	private String birth;

	@Pattern(regexp = "^(?=.*[a-zA-Z])(?=.*\\d)(?=.*[`~!@#$%^&*()-_=+]).{4,24}$"
			,message = "패스워드: 영문자,기호,숫자를 반드시 1개 포함하여 4~24 글자로 하세요.")
	private String password;

	@JsonFormat(pattern = "yyyy-MM-dd HH:mm")
	private LocalDateTime reg_date;

	private String subjects;
}
//테이블의 컬럼 변경 : 1) birth 컬럼 추가 2) id 컬럼을 pk 로 설정 3)email 컬럼은 unique 4)subject - 관심분야 컬럼 추가
