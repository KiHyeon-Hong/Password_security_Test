## Password_security_Test

### Visualizing data

-   https://kihyeon-hong.github.io/Password_security_test/analysis/performace_graph
-   https://kihyeon-hong.github.io/Password_security_test/analysis/leak_password_analysis
-   https://kihyeon-hong.github.io/Password_security_test/analysis/roc_curve

### File structure

#### /analysis

-   논문 실험 데이터 시각화 디렉터리

#### /etc

-   기타 테스트 코드

#### /files

-   Password list
-   기존 모델과 비교를 위한 특징 및 라벨 추출 파일

#### /graphData

-   ROC 곡선을 위한 각 비밀번호 보안성 평가모델들의 fpr, tpr 파일
-   npm i simple_roc 이용

#### /graphSrc

-   제안한 평가모델과 기존의 평가모델로 추출한 fpr, tpr 코드

#### /models

-   학습한 모델의 성능을 평가하기 위한 9,330개의 평가모델 학습 결과

#### /models_backup

-   학습된 평가모델 백업 파일

#### /performanceData

-   테스트 데이터로 평가한 각 은닉층 별 손실값, 정확도, 학습 시간 파일

#### /performanceSrc

-   테스트 데이터로 평가한 각 은닉층 별 손실값, 정확도, 학습 시간 코드

#### /preprocessingSrc

-   제안한 평가모델과 기존의 평가모델의 성능 비교를 위한 전처리 코드

#### /ROCData

-   ROC 곡선을 그리기 위한 예측 결과와 실제 정답 데이터 파일

#### /ROCSrc

-   ROC 곡선을 그리기 위한 예측 결과와 실제 정답 데이터 코드

#### /trainingData

-   은닉층에 따른 모든 경우의 수를 학습한 로그 파일

#### /trainingSrc

-   은닉층에 따른 모든 경우의 수를 학습하는 코드
