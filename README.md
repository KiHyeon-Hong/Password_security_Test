## Password_security_Test

### Visualizing data

-   https://kihyeon-hong.github.io/Password_security_test/analysis/performace_graph
-   https://kihyeon-hong.github.io/Password_security_test/analysis/leak_password_analysis
-   https://kihyeon-hong.github.io/Password_security_test/analysis/roc_curve

### File structure

#### /analysis

-   Experiment visualization files.

#### /etc

-   Test code.

#### /files

-   Password list files.
-   Password label, and feature matrix.

#### /graphData

-   ROC curve data from password security evaluation models.
-   npm i simple_roc.
-   fpr, tpr data.

#### /graphSrc

-   fpr, tpr dasta extracted with the proposed evaluation model.
-   fpr, tpr dasta extracted with the existing evaluation model.

#### /models

-   9,330 learning models.

#### /performanceData

-   Model performance evaluated by test data.
-   Loss, accuracy, and training time by hidden layer.

#### /performanceSrc

-   Model performance evaluated by test code.
-   Loss, accuracy, and training time by hidden layer.

#### /preprocessingSrc

-   Pre-processing code for visualizing model performance evaluation.

#### /ROCData

-   Model prediction result and actual label data.

#### /ROCSrc

-   Model prediction result and actual label data code.

#### /trainingData

-   Training log file according to the depth of the hidden layer.

#### /trainingSrc

-   Training code according to the depth of the hidden layer.
