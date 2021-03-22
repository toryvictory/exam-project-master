import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import {
  changeShowModeCatalog,
  changeRenameCatalogMode,
  changeCatalogName,
} from '../../../../actions/actionCreator';
import styles from './CatalogHeader.module.sass';
import FormInput from '../../../FormInput/FormInput';

const validate = (values) => {
  const errors = {};
  if (!values.catalogName || !values.catalogName.trim().length) {
    errors.catalogName = 'Cannot be empty';
  }
  return errors;
};

const CatalogListHeader = (props) => {
  const changeCatalogName = (values) => {
    const { changeCatalogName, id } = props;
    changeCatalogName({ catalogName: values.catalogName, catalogId: id });
  };
  const {
    handleSubmit,
    catalogName,
    changeShowModeCatalog,
    changeRenameCatalogMode,
    isRenameCatalog,
    valid,
  } = props;
  return (
    <div className={styles.headerContainer}>
      <i
        className="fas fa-long-arrow-alt-left"
        onClick={() => changeShowModeCatalog()}
      />
      {!isRenameCatalog && (
        <div className={styles.infoContainer}>
          <span>{catalogName}</span>
          <i
            className="fas fa-edit"
            onClick={() => changeRenameCatalogMode()}
          />
        </div>
      )}
      {isRenameCatalog && (
        <div className={styles.changeContainer}>
          <form onSubmit={handleSubmit(changeCatalogName)}>
            <Field
              name="catalogName"
              classes={{
                container: styles.inputContainer,
                input: styles.input,
                warning: styles.fieldWarning,
                notValid: styles.notValid,
              }}
              component={FormInput}
              type="text"
              label="Catalog Name"
            />
            {valid && <button type="submit">Change</button>}
          </form>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  const { isRenameCatalog } = state.chatStore;
  const { catalogName, id } = state.chatStore.currentCatalog;
  return {
    id,
    catalogName,
    isRenameCatalog,
    initialValues: {
      catalogName,
    },
  };
};

const mapDispatchToProps = (dispatch) => ({
  changeShowModeCatalog: () => dispatch(changeShowModeCatalog()),
  changeRenameCatalogMode: () => dispatch(changeRenameCatalogMode()),
  changeCatalogName: (data) => dispatch(changeCatalogName(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  reduxForm({
    form: 'catalogRename',
    validate,
  })(CatalogListHeader),
);
