pipeline {
  agent any

  parameters {                                    // choices shown when you click "Build with Parameters"
    choice(name: 'BROWSER', choices: ['chromium', 'firefox', 'webkit'], description: 'Browser to run')
    string(name: 'TAG', defaultValue: '@smoke', description: 'Test tag to run')
  }

  triggers {
    cron('H 2 * * *')                             // nightly run at about 2 AM
  }

  stages {
    stage('Install') {
      steps {
        sh 'npm ci'                               // exact versions from package-lock.json
        sh 'npx playwright install --with-deps'
      }
    }
    stage('Test') {
      steps {
        sh "npx playwright test --project=${params.BROWSER} --grep ${params.TAG}"
      }
    }
  }

  post {
    always {
      archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true   // keep the report
    }
    failure {
      echo 'Tests failed — notify the team'
    }
  }
}