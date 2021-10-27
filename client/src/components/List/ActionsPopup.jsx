import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Menu } from 'semantic-ui-react';
import { withPopup } from '../../lib/popup';
import { Popup } from '../../lib/custom-ui';

import { useSteps } from '../../hooks';
import DeleteStep from '../DeleteStep';

import styles from './ActionsPopup.module.scss';

const StepTypes = {
  DELETE: 'DELETE',
  DELETE_CARDS: 'DELETE_CARDS',
};

const ActionsStep = React.memo(({ onNameEdit, onCardAdd, onDelete, onDeleteCards, onClose }) => {
  const [t] = useTranslation();
  const [step, openStep, handleBack] = useSteps();

  const handleEditNameClick = useCallback(() => {
    onNameEdit();
    onClose();
  }, [onNameEdit, onClose]);

  const handleAddCardClick = useCallback(() => {
    onCardAdd();
    onClose();
  }, [onCardAdd, onClose]);

  const handleDeleteClick = useCallback(() => {
    openStep(StepTypes.DELETE);
  }, [openStep]);

  const handleDeleteCardsClick = useCallback(() => {
    openStep(StepTypes.DELETE_CARDS);
  }, [openStep]);

  if (step && step.type === StepTypes.DELETE) {
    return (
      <DeleteStep
        title={t('common.deleteList', {
          context: 'title',
        })}
        content={t('common.areYouSureYouWantToDeleteThisList')}
        buttonContent={t('action.deleteList')}
        onConfirm={onDelete}
        onBack={handleBack}
      />
    );
  }

  if (step && step.type === StepTypes.DELETE_CARDS) {
    return (
      <DeleteStep
        title={t('common.deleteListCards', {
          context: 'title',
        })}
        content={t('common.areYouSureYouWantToDeleteThisListCards')}
        buttonContent={t('action.deleteListCards')}
        onConfirm={onDeleteCards}
        onBack={handleBack}
      />
    );
  }

  return (
    <>
      <Popup.Header>
        {t('common.listActions', {
          context: 'title',
        })}
      </Popup.Header>
      <Popup.Content>
        <Menu secondary vertical className={styles.menu}>
          <Menu.Item className={styles.menuItem} onClick={handleEditNameClick}>
            {t('action.editTitle', {
              context: 'title',
            })}
          </Menu.Item>
          <Menu.Item className={styles.menuItem} onClick={handleAddCardClick}>
            {t('action.addCard', {
              context: 'title',
            })}
          </Menu.Item>
          <Menu.Item className={styles.menuItem} onClick={handleDeleteClick}>
            {t('action.deleteList', {
              context: 'title',
            })}
          </Menu.Item>
          <Menu.Item className={styles.menuItem} onClick={handleDeleteCardsClick}>
            {t('action.deleteListCards', {
              context: 'title',
            })}
          </Menu.Item>
        </Menu>
      </Popup.Content>
    </>
  );
});

ActionsStep.propTypes = {
  onNameEdit: PropTypes.func.isRequired,
  onCardAdd: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onDeleteCards: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default withPopup(ActionsStep);
