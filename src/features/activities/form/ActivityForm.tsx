import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import { Button, Header, Segment } from 'semantic-ui-react'
import LoadingComponent from '../../../app/Layout/LoadingComponent'
import { useStore } from '../../../app/stores/store'
import { Formik, Form } from 'formik'
import {v4 as uuid} from 'uuid'
import * as yup from 'yup'
import MyTextInput from '../../../app/common/form/MyTextInput'
import MyTextArea from '../../../app/common/form/MytextArea'
import MySelectedInput from '../../../app/common/form/MySelectInput'
import { categoryOptions } from '../../../app/common/options/categoryOptions'
import MyDateInput from '../../../app/common/form/MyDateInput'
import { Activity } from '../../../app/models/activity'

const ActivityForm: React.FC = () => {
  const history = useHistory()
  const { activityStore } = useStore()
  const { createActivity, updateActivity, loading, loadActivity, loadingInitial } = activityStore
  const { id } = useParams<{ id: string }>()
  const [activity, setActivity] = useState<Activity>({
    id: '',
    title: '',
    category: '',
    description: '',
    date: null,
    city: '',
    venue: ''
  })

  const validationSchema = yup.object({
    title: yup.string().required('The activity title is required'),
    description:yup.string().required('The activity description is required'),
    category:yup.string().required(),
    date:yup.string().required('Date is required').nullable(),
    venue:yup.string().required(),
    city:yup.string().required(),
  })

  useEffect(() => {
    if (id) loadActivity(id).then((item) => setActivity(item!))
  }, [id, loadActivity])

  const handleFormSubmit = (activity: Activity) => {
    if (activity.id.length === 0) {
      let newActivity = {
        ...activity,
        id: uuid()
      }
      createActivity(newActivity).then(() => history.push(`/activities/${newActivity.id}`))
    } else {
      updateActivity(activity).then(() => history.push(`/activities/${activity.id}`))
    }
  }

  if (loadingInitial) return <LoadingComponent content='loading...' />

  return (
    <Segment clearing>
      <Header content='Activity Details' sub color='teal' />
      <Formik enableReinitialize validationSchema={validationSchema} initialValues={activity} onSubmit={(values) => handleFormSubmit(values)}>
        {({ handleSubmit,isValid,isSubmitting,dirty }) => (
          <Form className='ui form' onSubmit={handleSubmit}>
            <MyTextInput placeholder='Title' name='title' />
            <MyTextArea rows={3} placeholder='Description' name='description' />
            <MySelectedInput options={categoryOptions} placeholder='Category' name='category' />
            <MyDateInput  placeholderText='Date' name='date' timeCaption='time' dateFormat='d MMMM, yyyy h:mm aa' />
            <Header content='Location Details' sub color='teal' />
            <MyTextInput placeholder='City' name='city' />
            <MyTextInput placeholder='Venue' name='venue' />
            <Button disabled={isSubmitting || !dirty || !isValid} loading={loading} floated='right' positive type='submit' content='Submit' />
            <Button floated='right' type='button' content='Cancel' as={Link} to='/activities' />
          </Form>
        )}
      </Formik>
    </Segment>
  )
}

export default observer(ActivityForm)
