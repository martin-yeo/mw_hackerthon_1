<script lang="ts" src="./script/list.ts"></script>
<style src="./style/list.css"/>

<div class="row">
    <div class="col">
        <DataTable sortable table$aria-label="User list" style="width: 100%;">
            <Head>
                <Row>
                    <Cell numeric>번호</Cell>
                    <Cell>이름</Cell>
                </Row>
            </Head>
            <Body>
            {#each list as item (item.num)}
                <Row>
                    <Cell numeric>{item.num}</Cell>
                    <Cell>{item.name}</Cell>
                </Row>
            {/each}
            </Body>
        </DataTable>
    </div>
</div>
