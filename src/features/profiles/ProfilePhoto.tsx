import { observer } from 'mobx-react-lite'
import React, { SyntheticEvent, useState } from 'react'
import { Button, Card, Grid, Header, Image, Tab } from 'semantic-ui-react'
import PhotoUploadWidget from '../../app/common/imageUpload/PhotoUploadWidget'
import { Photo, Profile } from '../../app/models/profile'
import { useStore } from '../../app/stores/store'

interface Props {
  profile: Profile
}
const ProfilePhoto = ({ profile }: Props) => {
  const {
    profileStore: { isCurrentUser, uploadPhoto, uploading, loading, setMainPhoto, deletePhoto }
  } = useStore()
  const [addPhotoMode, setAddPhotoMode] = useState(false)
  const [target, setTarget] = useState('')

  function handlePhotoUpload(file: Blob) {
    uploadPhoto(file).then(() => setAddPhotoMode(false))
  }
  function handleSetMainPhoto(photo: Photo, e: SyntheticEvent<HTMLButtonElement>) {
    setTarget(e.currentTarget.name)
    setMainPhoto(photo)
  }
  function handleDeletePhoto(photo: Photo, e: SyntheticEvent<HTMLButtonElement>) {
    setTarget(e.currentTarget.name)
    deletePhoto(photo)
  }
  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16}>
          <Header floated='left' icon='image' content='Photos' />
          {isCurrentUser && (
            <Button
              floated='right'
              basic
              content={addPhotoMode ? 'Cancel' : 'Add Photo'}
              onClick={() => {
                setAddPhotoMode(!addPhotoMode)
              }}
            />
          )}
        </Grid.Column>
        <Grid.Column width={16}>
          {addPhotoMode ? (
            <PhotoUploadWidget uploadPhoto={handlePhotoUpload} loading={uploading} />
          ) : (
            <Card.Group itemsPerRow={5}>
              {profile.photos?.map((item) => {
                return (
                  <Card key={item.id}>
                    <Image src={item.url} />
                    {isCurrentUser && (
                      <Button.Group fluid widths={2}>
                        <Button
                          basic
                          color='green'
                          content='Main'
                          name={'main' + item.id}
                          disabled={item.isMain}
                          loading={target === 'main' + item.id && loading}
                          onClick={(e) => handleSetMainPhoto(item, e)}
                        />
                        <Button
                          basic
                          color='red'
                          icon='trash'
                          loading={target === item.id && loading}
                          onClick={(e) => handleDeletePhoto(item, e)}
                          disabled={item.isMain}
                          name={item.id}
                        />
                      </Button.Group>
                    )}
                  </Card>
                )
              })}
            </Card.Group>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  )
}

export default observer(ProfilePhoto)
