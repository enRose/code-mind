'use client'

import React from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Button
} from '@nextui-org/react'
import { Commit } from './types'

export default function CommitVis({ commit }: { commit: Commit }) {
  const [isFollowed, setIsFollowed] = React.useState(false)

  return (
    <Card className="max-w-[840px]">
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          <Avatar
            isBordered
            radius="full"
            size="md"
            src="https://nextui.org/avatars/avatar-1.png"
          />
          <div className="flex flex-col items-start justify-center gap-1">
            <h4 className="text-small text-default-600 font-semibold leading-none">
              {commit.commit.author.name}
            </h4>
            <h5 className="text-small text-default-400 tracking-tight">
              @{commit.sha}
            </h5>
          </div>
        </div>
        <Button
          className={
            isFollowed
              ? 'text-foreground border-default-200 bg-transparent'
              : ''
          }
          color="primary"
          radius="full"
          size="sm"
          variant={isFollowed ? 'bordered' : 'solid'}
          onPress={() => setIsFollowed(!isFollowed)}
        >
          {isFollowed ? 'Unfollow' : 'Follow'}
        </Button>
      </CardHeader>
      <CardBody className="text-small text-default-400 px-3 py-0">
        {commit.files.map(file => (
          <div key={file.filename}>
            <p>File: {file.filename}</p>
            <p>Additions: {file.additions}</p>
            <p>Deletions: {file.deletions}</p>
            <p>Changes: {file.changes}</p>
            <p>Status: {file.status}</p>
          </div>
        ))}

        <span className="pt-2">
          <span className="py-2" aria-label="computer" role="img">
            Date: {new Date(commit.commit.author.date).toLocaleString()}
          </span>
        </span>
      </CardBody>
      <CardFooter className="gap-3">
        <div className="flex gap-1">
          <p className="text-default-400 text-small font-semibold">4</p>
          <p className="text-default-400 text-small">Following</p>
        </div>
        <div className="flex gap-1">
          <p className="text-default-400 text-small font-semibold">97.1K</p>
          <p className="text-default-400 text-small">Followers</p>
        </div>
      </CardFooter>
    </Card>
  )
}
