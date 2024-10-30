<script lang="ts" src="./script/script.ts"></script>
<style src="./style/style.css"/>

<div class="row">
    <div>
        <Button variant="unelevated" on:click={() => navigateList()}>
            <Label>리스트 페이지</Label>
        </Button>
    </div>

    <div class="mt-3">
        <Button variant="unelevated" on:click={() => navigateOne(3)}>
            <Label>게시글조회 페이지</Label>
        </Button>
    </div>

    <div class="mt-3">
        <Button variant="unelevated" on:click={() => navigateInsert()}>
            <Label>등록 페이지</Label>
        </Button>
    </div>

    <div class="mt-3">
        <Button variant="unelevated" on:click={() => navigateUpdate(3)}>
            <Label>수정 페이지</Label>
        </Button>
    </div>

    <div class="mt-3">
        <Button variant="unelevated" on:click={() => navigateDelete(3)}>
            <Label>삭제 페이지</Label>
        </Button>
    </div>
</div>