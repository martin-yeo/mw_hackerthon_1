<script lang="ts" src="./script/insert.ts"></script>
<style src="./style/insert.css"/>

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
            <Button variant="unelevated" on:click={() => register()} class="ml-2">
                <Label>등록</Label>
            </Button>
        </Group>
    </div>

    <div class="mt-3">
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
                        <Cell>이름</Cell>
                        <Cell style="padding:20px 20px 20px 0">
                            <Textfield class="w-100" variant="outlined" bind:value={name} />
                        </Cell>
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