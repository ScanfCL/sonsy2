"use client";

import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";

type ConfirmDeleteModalProps = {
  name: string;
  isOpen: boolean;
  isLoading?: boolean;
  onClose: () => void;
  onDelete: () => void;
};

const ConfirmDeleteModal = ({
  name,
  isOpen,
  isLoading,
  onClose,
  onDelete,
}: ConfirmDeleteModalProps) => {
  return (
    <Modal size="sm" isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Are you sure you want to delete this {name}?
            </ModalHeader>
            <ModalFooter>
              <Button color="default" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button color="danger" onPress={onDelete} isLoading={isLoading}>
                Delete
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ConfirmDeleteModal;
