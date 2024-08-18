# auto-reviewer-assign

auto-reviewer-assign은 Pull request의 Reviewers를 랜덤으로 지정하기 위한 액션입니다.

## 사용법

### 1. 사전 준비

액션 사용에 필요한 값을 리포지토리에 등록하세요.<br/>
`(선택)` 항목은 리포지토리에 등록하거나, workflow.yml에 직접 값을 넣으면 됩니다.<br/>

- (필수) Repository secret에 **Pull request write 권한이 있는 GitHub Token**을 등록하세요.

- (선택) Repository variable에 모든 리뷰어의 깃허브 닉네임을 **공백 기준으로 분리**해서 등록하세요.

- (선택) Repository variable에 지정할 리뷰어의 수를 등록하세요.


### 2. workflow 생성

`.github/workflows` 폴더에 YAML 파일을 생성하세요.

```yaml
      name: Auto Assign Reviewers

        on:
          pull_request:
            types: [opened, reopened]

        permissions:
          pull-requests: write

        jobs:
          assign-reviewers:
            runs-on: ubuntu-latest
            steps:
              - name: Checkout source code
                uses: actions/checkout@v4

              - name: Run action
                uses: nijuy/auto-reviewer-assign@main
                with:
                  github_token: ${{ secrets.YOUR_GITHUB_TOKEN }}
                  code_owners: 'name name2 name3' // or ${{ vars.CODE_OWNERS }}
                  reviewer_count: 3 // or ${{ vars.REVIEWER_COUNT }}
```

## 주의사항

- Pull Request를 생성한 사용자를 제외하고 `reviewer_count`명의 리뷰어를 지정합니다.

- GitHub Token은 반드시 Pull Request write 권한을 가져야 합니다. ([참고 링크](https://docs.github.com/ko/rest/pulls/review-requests?apiVersion=2022-11-28#request-reviewers-for-a-pull-request))

- 조직의 리포지토리에서 사용할 경우, 개인용 fine-grained GitHub Token은 조직에 승인된 상태여야 합니다. ([참고 링크](https://docs.github.com/ko/organizations/managing-programmatic-access-to-your-organization/managing-requests-for-personal-access-tokens-in-your-organization))


## 라이센스

이 액션의 라이센스는 [`dist/licenses.txt`](https://github.com/nijuy/auto-reviewer-assign/blob/main/dist/licenses.txt)에 명시되어 있습니다.
