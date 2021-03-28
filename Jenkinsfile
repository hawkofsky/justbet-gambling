pipeline {
  options {
    disableConcurrentBuilds()
    buildDiscarder(logRotator(artifactDaysToKeepStr: '', artifactNumToKeepStr: '', daysToKeepStr: '5', numToKeepStr: '5'))
  }
  agent {
    node {
      label 'ubuntu-18.04'
    }
  }
  stages {
    stage('INIT') {
      steps {
        nodejs('nodejs-10') {
          sh 'cd packages/web-app/ && npm install'
        }
      }
    }
    stage('BUILD') {
      parallel {
        stage('build server') {
          steps {
            nodejs('nodejs-10') {
              sh 'cd packages/server/ && yarn && yarn run build'
            }
          }
        }
        stage('build web') {
          steps{
            nodejs('nodejs-10') {
               sh 'cd packages/web-app/ && npm run build'
            }
          }
        }
      }
    }
    stage('DEPLOY') {
        parallel {
          stage('Deploy justbet.blaize.tech') {
            when {
              branch 'staging'
            }
            steps {
              //https://www.jenkins.io/doc/pipeline/steps/publish-over-ssh/
              sshPublisher(
                failOnError: true,
                publishers: [
                  sshPublisherDesc(
                    configName: 'justbet.blaize.tech',
                    transfers: [
                      sshTransfer(
                          cleanRemote: false,
                          remoteDirectory: 'justbet.blaize.tech/${BUILD_TAG}',
                          excludes: '',
                          sourceFiles: '''
                          docker-compose.yml,
                          packages/db/,
                          packages/server/package.json,
                          packages/server/yarn.lock,
                          packages/server/dist/,
                          packages/server/config/,
                          packages/server/database/,
                          packages/server/utils/,
                          packages/server/knexfile.js,
                          packages/server/Dockerfile,
                          packages/web-app/.nuxt/,
                          packages/web-app/static/,
                          packages/web-app/nuxt.config.js,
                          packages/web-app/package.json,
                          packages/web-app/package-lock.json
                          ''',
                          execCommand: '''
                          set -e
                          set -x
                          BUILD=${BUILD_TAG}
                          SRC=/home/justbet-www/justbet.blaize.tech
                          WWW=/var/www/justbet.blaize.tech

                          DEST=${WWW}/docker-compose.yml
                          rm -f ${DEST}
                          ln -s -f  ${SRC}/${BUILD}/docker-compose.yml ${DEST}

                          DEST=${WWW}/packages
                          rm -f ${DEST}
                          ln -s -f -d ${SRC}/${BUILD}/packages ${DEST}

                          for i in `ls -d ${SRC}/* | grep -v "${BUILD}$"`;do rm -rf  "${i}"; done

                          cd ${WWW} && sudo /usr/bin/docker-compose down && sudo /usr/bin/docker-compose up -d --build
                          ''',
                          execTimeout: 120000,
                          flatten: false,
                          makeEmptyDirs: false,
                          noDefaultExcludes: false,
                          patternSeparator: '[, ]+',
                          remoteDirectorySDF: false,
                          removePrefix: ''
                        )
                    ],
                    usePromotionTimestamp: false,
                    useWorkspaceInPromotion: false,
                    verbose: true
                  )
                ]
              )
            }
          }
          stage('Deploy justbet-test.blaize.tech') {
              when {
                branch 'develop'
              }
              steps {
                //https://www.jenkins.io/doc/pipeline/steps/publish-over-ssh/
                  sshPublisher(
                    failOnError: true,
                    publishers: [
                      sshPublisherDesc(
                        configName: 'justbet.blaize.tech',
                        transfers: [
                          sshTransfer(
                              cleanRemote: false,
                              remoteDirectory: 'justbet-test/${BUILD_TAG}',
                              excludes: '',
                              sourceFiles: '''
                              docker-compose.justbet-test.blaize.tech.yml,
                              packages/config/,
                              packages/db/,
                              packages/server/package.json,
                              packages/server/yarn.lock,
                              packages/server/dist/,
                              packages/server/config/,
                              packages/server/database/,
                              packages/server/utils/,
                              packages/server/knexfile.js,
                              packages/server/Dockerfile,
                              packages/web-app/.nuxt/,
                              packages/web-app/static/,
                              packages/web-app/nuxt.config.js,
                              packages/web-app/package.json,
                              packages/web-app/package-lock.json
                              ''',
                              execCommand: '''
                              set -e
                              set -x
                              BUILD=${BUILD_TAG}
                              SRC=/home/justbet-www/justbet-test
                              WWW=/var/www/justbet-test

                              DEST=${WWW}/docker-compose.yml
                              rm -f ${DEST}
                              ln -s -f  ${SRC}/${BUILD}/docker-compose.justbet-test.blaize.tech.yml ${DEST}

                              DEST=${WWW}/yarn.lock
                              rm -rf ${DEST}
                              ln -s -f  ${SRC}/${BUILD}/yarn.lock ${DEST}

                              DEST=${WWW}/packages
                              rm -f ${DEST}
                              ln -s -f -d ${SRC}/${BUILD}/packages ${DEST}

                              for i in `ls -d ${SRC}/* | grep -v "${BUILD}$"`;do rm -rf  "${i}"; done

                              cd ${WWW} && sudo /usr/bin/docker-compose down && sudo /usr/bin/docker-compose up -d --build
                              ''',
                              execTimeout: 120000,
                              flatten: false,
                              makeEmptyDirs: false,
                              noDefaultExcludes: false,
                              patternSeparator: '[, ]+',
                              remoteDirectorySDF: false,
                              removePrefix: ''
                            )
                        ],
                        usePromotionTimestamp: false,
                        useWorkspaceInPromotion: false,
                        verbose: true
                      )
                    ]
                   )
              }
          } // stage deploy test {
          stage('production(main) -> https://app.just.bet/') {
            when {
                branch 'staging'
            }
            steps {
              nodejs('nodejs-10') {
                archiveArtifacts(artifacts: '''
                    docker-compose.yml,
                    packages/db/,
                    packages/server/package.json,
                    packages/server/yarn.lock,
                    packages/server/dist/,
                    packages/server/config/,
                    packages/server/database/,
                    packages/server/utils/,
                    packages/server/knexfile.js,
                    packages/server/Dockerfile,
                    packages/web-app/.nuxt/,
                    packages/web-app/static/,
                    packages/web-app/nuxt.config.js,
                    packages/web-app/package.json,
                    packages/web-app/package-lock.json
                    ''', onlyIfSuccessful: true)
              }
            }
          }// deploy production {
        } // parallel {
    } // stage('Deploy') {
  } // stages {
}
