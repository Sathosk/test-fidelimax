'use client'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useRef } from 'react'
import { twMerge } from 'tailwind-merge'

interface ModalProps {
  openModal: boolean
  children: React.ReactNode
  classNames?: string
  closeModal?: () => void
  closeOnOverlay?: boolean
}

export function Modal({
  openModal,
  children,
  classNames,
  closeOnOverlay = true,
  closeModal,
}: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement | null>(null)

  function handleCloseModal(
    e: React.MouseEvent<HTMLDivElement | HTMLButtonElement, MouseEvent>,
  ) {
    if (
      e.target === overlayRef.current ||
      buttonRef.current?.contains(e.target as Node)
    ) {
      if (closeModal) {
        closeModal()
      }
    }
  }

  console.log('openModal: ', openModal)

  return (
    <AnimatePresence>
      {openModal && (
        // Modal Overlay
        <motion.div
          className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50`}
          ref={overlayRef}
          onClick={(e) => closeOnOverlay && handleCloseModal(e)}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
            transition: {
              duration: 0.5,
            },
          }}
          exit={{
            opacity: 0,
            transition: {
              duration: 0.3,
            },
          }}
        >
          {/* Modal Container */}
          <motion.div
            className={twMerge(
              'relative flex max-w-[90vw] flex-col items-center justify-between gap-6 overflow-auto rounded-2xl bg-white bg-gradient-to-b text-white shadow-md',
              classNames,
            )}
            initial={{ scale: 0 }}
            animate={{
              scale: 1,
              transition: {
                duration: 0.5,
              },
            }}
            exit={{
              scale: 0,
              transition: {
                duration: 0.5,
              },
            }}
          >
            {/* Modal Content */}
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
