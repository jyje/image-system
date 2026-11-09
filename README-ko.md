<div align="center">

# jyje/image-system

<img src="assets/brand/jyje.svg" width="112" height="112" alt="jyje 로고">

개인 디자인 시스템을 위한 이미지 생성 워크플로와 재사용 갤러리입니다.

[English](README.md) / [한국어](README-ko.md) / [갤러리](gallery/README.md) / [문서](docs/README.md)

</div>

이미지를 어디에 쓸지부터 정합니다. 갤러리에서 적합한 이미지를 찾거나, 버전이 기록된 팔레트, 스타일, 레시피를 조합해 새 이미지를 만듭니다. 결과와 제작 조건을 함께 남겨 다음 작업에 재사용합니다.

기본 강조색은 `jyje/profile`과 `jyje/profile-2`에서 공통으로 쓰는 팥죽색 `#680C2C`입니다.

## 시작하기

GitHub나 Markdown 미리보기에서 [갤러리](gallery/README.md)를 엽니다. 초기 방향을 비교할 수 있는 자체 제작 SVG 샘플 2종이 들어 있습니다. 샘플과 사용 승인 자산은 구분해 표시합니다.

Node.js 22에서 갤러리를 갱신하고 검증할 수 있습니다. 외부 패키지 설치가 필요 없습니다.

```sh
node scripts/gallery.mjs build
node scripts/gallery.mjs check
```

- [GOAL.md](GOAL.md)에 프로젝트 목적과 성공 기준을 정리했습니다.
- [PLAN.md](PLAN.md)에서 초기 갤러리와 생성 파일럿의 진행 상황을 관리합니다.
- [docs/](docs/README.md)에서 큐레이션, 검수, 공개 사례를 확인할 수 있습니다.
- [catalog/catalog.json](catalog/catalog.json)에서 갤러리의 원본 데이터를 관리합니다.
