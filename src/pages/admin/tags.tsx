import {
  ChevronUpDownIcon,
  MagnifyingGlassIcon,
  PencilSquareIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import {
  Button,
  IconButton,
  Tooltip,
  Typography,
} from '@material-tailwind/react'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { deleteTagFn, getTagsFn } from '~/api/tagApi'
import ConfirmModal from '~/components/Shared/ConfirmModal'
import CreateAndEditTagModal from '~/components/Tags/CreateAndEditTagModal'
import Input from '~/components/UI/Input'
import AdminLayout from '~/layouts/AdminLayout'
import type { ITag } from '~/resources/interfaces/tag.interface'
import { showToast } from '~/utils/toast'
import type { NextPageWithLayout } from '../_app'

const TABLE_HEAD = ['Name', '']

const Tags: NextPageWithLayout = () => {
  const session = useSession()
  const queryClient = useQueryClient()
  const [openCreateTagModal, setOpenCreateTagModal] = useState<boolean>(false)
  const [openEditTagModal, setOpenEditTagModal] = useState<boolean>(false)
  const [openConfirmModal, setOpenConfirmModal] = useState<boolean>(false)
  const [selectedTag, setSelectedTag] = useState<ITag>()

  const { data: tagsData } = useQuery({
    queryKey: ['tags'],
    queryFn: async () =>
      await getTagsFn({ jwt: session.data?.user?.access_token ?? '' }),
    onError: (error: any) => {
      showToast('error', error.response.data.message)
    },
  })

  const { mutate: deleteTag } = useMutation(
    async (tagId: string) =>
      await deleteTagFn({
        jwt: session.data?.user.access_token ?? '',
        id: tagId,
      }),
    {
      onSuccess() {
        showToast('success', 'Deleted tag successfully')
        handleToggleConfirmModal()
        queryClient.invalidateQueries('tags')
      },
      onError(error: any) {
        showToast('error', error.response.data.message)
      },
    }
  )

  const handleToggleCreateTagModal = (): void => {
    setOpenCreateTagModal((prev) => !prev)
  }

  const handleToggleEditTagModal = (): void => {
    setOpenEditTagModal((prev) => !prev)
  }

  const handleToggleConfirmModal = (): void => {
    setOpenConfirmModal((prev) => !prev)
  }

  const handleSelectTagToEdit = (tag: ITag): void => {
    setSelectedTag(tag)
    handleToggleEditTagModal()
  }

  const handleSelectTagToDelete = (tag: ITag): void => {
    setSelectedTag(tag)
    handleToggleConfirmModal()
  }

  const handleDeleteTag = (): void => {
    if (selectedTag) deleteTag(selectedTag._id)
  }

  return (
    <>
      <Head>
        <title>Dev Forum</title>
      </Head>
      <div className="h-full w-full p-6">
        <div className="rounded-none">
          <Typography variant="h5" color="blue-gray" className="mb-8">
            Tags list
          </Typography>
          <div className="flex justify-end gap-2">
            <Input
              label="Search"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              value=""
              onChange={() => {}}
            />
            <Button color="cyan" onClick={handleToggleCreateTagModal}>
              Create tag
            </Button>
          </div>
        </div>
        <table className="mt-4 box-border w-full min-w-max table-auto overflow-hidden rounded-lg text-left ring-1 ring-blue-gray-50">
          <thead>
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <th
                  key={head}
                  className="cursor-pointer bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                  >
                    {head}
                    {index !== TABLE_HEAD.length - 1 && (
                      <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                    )}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="h-[400px]">
            {tagsData?.data.map((tag, index) => {
              const isLast = index === tagsData.data.length - 1
              const classes = isLast
                ? 'p-4'
                : 'p-4 border-b border-blue-gray-50'

              return (
                <tr key={tag._id}>
                  <td className={`${classes}`}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="h-fit font-normal"
                    >
                      {tag.name}
                    </Typography>
                  </td>
                  <td
                    className={`${classes} flex items-center justify-end gap-2`}
                  >
                    <Tooltip content="Edit tag">
                      <IconButton
                        variant="filled"
                        color="cyan"
                        onClick={() => {
                          handleSelectTagToEdit(tag)
                        }}
                      >
                        <PencilSquareIcon className="h-5 w-5" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip content="Delete tag">
                      <IconButton
                        variant="filled"
                        color="pink"
                        onClick={() => {
                          handleSelectTagToDelete(tag)
                        }}
                      >
                        <XMarkIcon className="h-5 w-5" />
                      </IconButton>
                    </Tooltip>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>

        <CreateAndEditTagModal
          type="create"
          open={openCreateTagModal}
          handler={handleToggleCreateTagModal}
        />
        <CreateAndEditTagModal
          type="edit"
          open={openEditTagModal}
          handler={handleToggleEditTagModal}
          selectedTag={selectedTag}
        />
        <ConfirmModal
          message="You really want to delete this tag?"
          open={openConfirmModal}
          handler={handleToggleConfirmModal}
          action={handleDeleteTag}
        />
      </div>
    </>
  )
}

export default Tags

Tags.getLayout = (page) => {
  return <AdminLayout>{page}</AdminLayout>
}
