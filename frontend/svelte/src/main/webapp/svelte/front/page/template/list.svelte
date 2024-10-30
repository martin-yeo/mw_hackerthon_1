<script lang="ts" src="./script/list.ts"></script>
<style src="./style/list.css"/>

<div class="row">
    <div class="btn-container">
        <Group>
            <IconButton on:click={()=> (backToList())}>
                <Icon color="primary" class="material-icons">
                    <Icon component={Svg} viewBox="0 0 24 24">
                        <path fill="currentColor" d={mdiArrowLeft} />
                    </Icon>
                </Icon>
            </IconButton>
        </Group>

        <Group>

        </Group>
    </div>

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
