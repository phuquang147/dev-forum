import { PlusIcon } from '@heroicons/react/24/outline'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  Button,
  IconButton,
  List,
  ListItem,
  Option,
  Popover,
  PopoverContent,
  PopoverHandler,
  Select,
  Spinner,
  Typography,
} from '@material-tailwind/react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect, useState, type FC } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import * as yup from 'yup'
import { createPostFn, updatePostFn } from '~/api/postApi'
import { getTagsFn } from '~/api/tagApi'
import useDebounce from '~/hooks/useDebounce'
import type {
  IPost,
  IPostFormData,
} from '~/resources/interfaces/post.interface'
import type { ITag } from '~/resources/interfaces/tag.interface'
import type { TTopic } from '~/resources/types/common.type'
import { showToast } from '~/utils/toast'
import Editor from '../Shared/Editor'
import ErrorWrapper from '../UI/ErrorWrapper'
import Input from '../UI/Input'
import Tag from './Tag'

const schema = yup
  .object({
    title: yup.string().required('Please enter post title'),
    description: yup.string().required('Please enter post description'),
    topic: yup.string().required('Please enter post description'),
  })
  .required()

interface PostFormProps {
  type?: 'create' | 'edit'
  post?: IPost
}

const PostForm: FC<PostFormProps> = ({ type = 'create', post }) => {
  const session = useSession()
  const router = useRouter()
  const [selectedTags, setSelectedTags] = useState<ITag[]>([])
  const [loadedTags, setLoadedTags] = useState<ITag[]>([])
  const [filteredTags, setFilteredTags] = useState<ITag[]>([])
  const [searchValue, setSearchValue] = useState<string>('')
  const debouncedValue = useDebounce<string>(searchValue, 500)

  useQuery({
    queryKey: ['tags'],
    queryFn: async () =>
      await getTagsFn({ jwt: session.data?.user?.access_token ?? '' }),
    onSuccess(data) {
      setLoadedTags(data.data)
    },
    onError: (error: any) => {
      showToast('error', error.response?.data.message)
    },
  })

  const { mutate: createPost, isLoading: isLoadingCreatePost } = useMutation(
    async (data: IPostFormData) =>
      await createPostFn({ jwt: session.data?.user.access_token ?? '', data }),
    {
      onSuccess(data) {
        showToast('success', 'Created post successfully')
        reset()
        setSelectedTags([])
      },
      onError(error: any) {
        showToast('error', error.response.data.message)
      },
    }
  )

  const { mutate: updatePost, isLoading: isLoadingUpdatePost } = useMutation(
    async (data: IPostFormData) =>
      await updatePostFn({
        jwt: session.data?.user.access_token ?? '',
        data,
        id: post?._id ?? '',
      }),
    {
      onSuccess() {
        showToast('success', 'Updated post successfully')
        reset()
        if (type === 'create') {
          setSelectedTags([])
        }
        router.push('/my-posts')
      },
      onError(error: any) {
        showToast('error', error.response.data.message)
      },
    }
  )

  useEffect(() => {
    if (post) {
      setSelectedTags(post.tags)
    }
  }, [post])

  useEffect(() => {
    if (debouncedValue.trim().length === 0) {
      setFilteredTags(loadedTags)
    }

    if (debouncedValue !== '') {
      const relevantMovies = loadedTags.filter((item) =>
        item.name.toLowerCase().includes(debouncedValue.toLowerCase())
      )
      setFilteredTags(relevantMovies)
    }
  }, [debouncedValue, loadedTags])

  const handleSelectTag = (tag: ITag): void => {
    setSelectedTags((prev) => [...prev, tag])
  }

  const handleUnSelectTag = (id: string): void => {
    setSelectedTags((prev) => prev.filter((tag) => tag._id !== id))
  }

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    reset,
    formState: { errors },
  } = useForm<IPostFormData>({
    defaultValues: {
      topic: post?.topic ?? 'discuss',
      title: post?.title ?? '',
      bounty: post?.bounty ?? 0,
      description: post?.description ?? '',
    },
    resolver: yupResolver(schema),
  })

  const onSubmit: SubmitHandler<IPostFormData> = async (data) => {
    if (type === 'create') {
      createPost({ ...data, tags: selectedTags.map((tag) => tag._id) })
    } else {
      updatePost({ ...data, tags: selectedTags.map((tag) => tag._id) })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Input
        label="Title"
        color="cyan"
        size="lg"
        register={register}
        name="title"
        fieldError={errors.title}
      />
      <Select
        size="lg"
        label="Topic"
        color="cyan"
        value={getValues('topic')}
        onChange={(value) => {
          setValue('topic', value as TTopic)
        }}
      >
        <Option value="discuss">Discuss</Option>
        <Option value="bug">Bug</Option>
        <Option value="news">Tech news</Option>
      </Select>
      <div className="relative">
        <Input
          type="number"
          label="Bounty"
          color="cyan"
          size="lg"
          register={register}
          name="bounty"
          fieldError={errors.bounty}
          className="pr-12"
        />
        <span className="absolute right-2 top-[10px]">VNĐ</span>
      </div>
      <ErrorWrapper
        fieldError={
          selectedTags.length === 0
            ? 'Please select at least one tag'
            : undefined
        }
      >
        <div className="flex items-center gap-2 rounded-lg border border-gray-400 p-3">
          {selectedTags.length === 0 && (
            <Typography variant="small">Select tags...</Typography>
          )}
          {selectedTags.map((tag) => (
            <Tag key={tag._id} tag={tag} onUnSelectTag={handleUnSelectTag} />
          ))}

          <Popover placement="bottom-start">
            <PopoverHandler>
              <IconButton variant="text" color="cyan">
                <PlusIcon className="h-4 w-4" />
              </IconButton>
            </PopoverHandler>
            <PopoverContent className="flex flex-col gap-4">
              <Input
                label="Find tags"
                value={searchValue}
                onChange={(e) => {
                  setSearchValue(e.target.value)
                }}
              />
              <List className="max-h-40 overflow-y-auto p-0">
                {filteredTags
                  .filter(
                    (tag) =>
                      selectedTags.findIndex(
                        (selectedTag) => selectedTag._id === tag._id
                      ) === -1
                  )
                  .map((tag) => (
                    <ListItem
                      key={tag._id}
                      className="h-10"
                      onClick={() => {
                        handleSelectTag(tag)
                      }}
                    >
                      {tag.name}
                    </ListItem>
                  ))}
              </List>
            </PopoverContent>
          </Popover>
        </div>
      </ErrorWrapper>
      <ErrorWrapper fieldError={errors.description?.message}>
        <Editor
          value={getValues('description')}
          onChange={(value) => {
            setValue('description', value)
          }}
          placeholder="Enter description here"
        />
      </ErrorWrapper>
      <div className="flex justify-end gap-4">
        <Button type="submit" color="cyan" className="mt-11">
          {isLoadingCreatePost || isLoadingUpdatePost ? (
            <Spinner color="cyan" />
          ) : type === 'create' ? (
            'Create Post'
          ) : (
            'Edit Post'
          )}
        </Button>
      </div>
    </form>
  )
}

export default PostForm
