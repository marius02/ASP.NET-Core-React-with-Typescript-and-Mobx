import React, { useEffect, useState } from "react";
import { Header, Grid, Button } from "semantic-ui-react";
import PhotoWidgetDropzone from "../imageUpload/PhotoWidgetDropzone";
import { Cropper } from "react-cropper";
import PhotoWidgetCropper from "./PhotoWidgetCropper";

interface Props {
  loading: boolean;
  uploadPhoto: (file: Blob) => void;
}

export default function PhotoUploadWidget({ loading, uploadPhoto }: Props) {
  const [files, setFiles] = useState<any>([]);
  const [cropper, setCropper] = useState<Cropper>();

  function OnCrop() {
    if (cropper) {
      cropper.getCroppedCanvas().toBlob((blob) => uploadPhoto(blob!));
    }
  }

  useEffect(() => {
    return () => {
      files.forEach((file: any) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  return (
    <Grid>
      <Grid.Column width={4}>
        <Header subheader color="teal" content="Step 1 -Add Photo"></Header>
        <PhotoWidgetDropzone setFiles={setFiles} />
      </Grid.Column>
      <Grid.Column width={1} />
      <Grid.Column width={4}>
        <Header subheader color="teal" content="Step 2 -Resize Photo"></Header>
        {files && files.length > 0 && (
          <PhotoWidgetCropper
            setCropper={setCropper}
            imagePreview={files[0].preview}
          />
        )}
      </Grid.Column>
      <Grid.Column width={1} />
      <Grid.Column width={4}>
        <Header sub color="teal" content="Step 3 -Preview & Upload"></Header>
        {files && files.length > 0 && (
          <>
            <div
              className="img-preview"
              style={{ minHeight: 200, overflow: "hidden" }}
            />
            <Button.Group widths={2}>
              <Button
                loading={loading}
                onClick={OnCrop}
                positive
                icon="check"
              ></Button>
              <Button
                disabled={loading}
                onClick={() => setFiles([])}
                icon="close"
              ></Button>
            </Button.Group>
          </>
        )}
      </Grid.Column>
    </Grid>
  );
}
