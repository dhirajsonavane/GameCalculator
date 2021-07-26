import { render } from '@testing-library/react';
import { useState } from 'react';
import ConfirmDialog from './ConfirmDialog';
import { confirmDialogType } from './ConfirmDialogType';

it('renders correctly', () => {
    const confirmDialogValues = {
        ReturnValue: '',
        IsOpen: false,
        Title: 'Are you sure you want to switch account?',
        SubTitle: 'Any unsaved changes will be lost',
        YesBtnText: 'Yes',
        NoBtnText: 'No'
    } as confirmDialogType;

    const setConfirmDialogValues = {} as React.Dispatch<React.SetStateAction<confirmDialogType>>;

    const { queryByTestId } = render(
        <ConfirmDialog
            confirmDialogValues={confirmDialogValues}
            setConfirmDialogValues={setConfirmDialogValues}
            handleConfirmDialog={(ReturnValue: string) => (ReturnValue)}
        />
    );
    expect(queryByTestId('confirm-dialog')).toBe(null);
});
