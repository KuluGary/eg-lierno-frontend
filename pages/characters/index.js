import { Box, Tab, Tabs, Typography } from "@mui/material";
import { Container, FileUploaderModal, Layout } from "components";
import { PaginatedTable } from "components/Table";
import Api from "helpers/api";
import { useMounted } from "hooks/useMounted";
import { useQueryState } from "hooks/useQueryState";
import Head from "next/head";
import Router from "next/router";
import { useState } from "react";
import { DeleteModal } from "components/DeleteModal/DeleteModal";
import { StringUtil } from "helpers/string-util";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export const uploadJsonFile = async (files, url, callback, refetch) => {
  const [file] = files;
  const reader = new FileReader();
  reader.readAsText(file);

  reader.onload = (e) => {
    const json = JSON.parse(e.target.result);

    Api.fetchInternal(url, { method: "POST", body: JSON.stringify(json) });

    if (!!callback) callback();
    if (!!refetch) refetch();
  };
};

export const deleteElement = async (id, url, callback, refetch) => {
  await Api.fetchInternal(`${url}/${id}`, { method: "DELETE" });

  if (!!refetch) refetch();
  if (!!callback) callback();
};

export default function Character() {
  const [value, setValue] = useQueryState("step", 0, "number");
  const [openUploadModal, setOpenUploadModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [elementToDelete, setElementToDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const hasMounted = useMounted();

  const handleChange = (_, newValue) => setValue(newValue);

  const uploadFile = async (files) => {
    const [file] = files;
    const reader = new FileReader();
    reader.readAsText(file);

    reader.onload = async (e) => {
      const json = JSON.parse(e.target.result);

      setIsLoading(true);
      await Api.fetchInternal("/characters", { method: "POST", body: JSON.stringify(json) });
      setIsLoading(false);
      setOpenUploadModal(false);
    };
  };

  const handleOpenDeleteModal = (id) => {
    setElementToDelete(id);
    setOpenDeleteModal(true);
  };

  const deleteElement = async () => {
    setIsLoading(true);
    await Api.fetchInternal(elementToDelete, { method: "DELETE" });
    setElementToDelete(null);
    setOpenDeleteModal(false);
    setIsLoading(false);
  };

  if (!hasMounted) return null;

  return (
    <Layout>
      <Head>
        <title>Lierno App | Mis personajes</title>
      </Head>
      <FileUploaderModal
        open={openUploadModal}
        onClose={() => {
          setElementToDelete(null);
          setOpenUploadModal(!openUploadModal);
        }}
        onSave={uploadFile}
      />
      <DeleteModal
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal((openModal) => !openModal)}
        onSave={deleteElement}
      />
      <Container
        noPadding
        header={
          <Box sx={{ p: "1em" }}>
            <Typography variant="h5" component="h1">
              Personajes
            </Typography>
          </Box>
        }
      >
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            textColor="secondary"
            indicatorColor="secondary"
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Personajes" {...a11yProps(0)} />
            <Tab label="NPCs" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <Box
          component="div"
          role="tabpanel"
          hidden={value !== 0}
          id={`simple-tabpanel-${0}`}
          aria-labelledby={`simple-tab-${0}`}
        >
          {value === 0 && (
            <PaginatedTable
              schema={{
                _id: "_id",
                name: "name",
                subtitle: (e) => StringUtil.getCharacterSubtitle(e) ?? "",
                avatar: "flavor.portrait.avatar",
                owner: "createdBy",
              }}
              loading={isLoading}
              fetchFrom={"/characters"}
              src={"/characters/{ID}"}
              onEdit={(id) => Router.push(`/characters/add/${id}`)}
              onDelete={(id) => handleOpenDeleteModal(`/characters/${id}`)}
              headerProps={{
                onAdd: () => Router.push("/characters/add"),
                onUpload: () => setOpenUploadModal(true),
              }}
            />
          )}
        </Box>
        <Box
          component="div"
          role="tabpanel"
          hidden={value !== 1}
          id={`simple-tabpanel-${1}`}
          aria-labelledby={`simple-tab-${1}`}
        >
          {value === 1 && (
            <PaginatedTable
              schema={{
                _id: "_id",
                subtitle: (e) => StringUtil.getNpcSubtitle(e) ?? "",
                name: "name",
                avatar: "flavor.portrait.avatar",
                owner: "createdBy",
              }}
              loading={isLoading}
              fetchFrom={"/npcs"}
              src={"/npcs/{ID}"}
              onEdit={(id) => Router.push(`/npcs/add/${id}`)}
              onDelete={(id) => handleOpenDeleteModal(`/npc/${id}`)}
              headerProps={{
                onAdd: () => Router.push("/npcs/add"),
              }}
            />
          )}
        </Box>
      </Container>
    </Layout>
  );
}
