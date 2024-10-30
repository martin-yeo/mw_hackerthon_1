<script lang="ts" src="./script/one.ts"></script>
<style src="./style/one.css"/>

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
        <Paper>
            <Content>
                <DataTable style="width: 100%;">
                    <Head>
                        <Row>
                            <Cell style="width:15%">구분</Cell>
                            <Cell>내용</Cell>
                        </Row>
                    </Head>
                    <Body>
                    <Row>
                        <Cell>글번호</Cell>
                        <Cell>{data.num}</Cell>
                    </Row>
                    <Row>
                        <Cell>값</Cell>
                        <Cell>{data.name}</Cell>
                    </Row>
                    </Body>
                </DataTable>
            </Content>
        </Paper>
    </div>
</div>

<Snackbar
    bind:this={snackbar}
    labelText="{message}">
    <Label/>
    <Actions>
        <Button on:click={() => snackbar.close()}>확인</Button>
    </Actions>
</Snackbar>