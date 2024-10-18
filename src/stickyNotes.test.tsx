// src/stickyNotes.test.tsx

import { render, screen, fireEvent, within } from '@testing-library/react';
import StickyNotes from './stickyNotes';
import { dummyNotesList } from './constants';

describe('StickyNotes Component', () => {
  test('displays existing notes', () => {
    render(<StickyNotes />);

    dummyNotesList.forEach((note) => {
      expect(screen.getByText(note.title)).toBeInTheDocument();
      expect(screen.getByText(note.content)).toBeInTheDocument();
    });
  });

  test('creates a new note', () => {
    render(<StickyNotes />);

    const titleInput = screen.getByPlaceholderText('Note Title');
    const contentTextarea = screen.getByPlaceholderText('Note Content');
    const labelSelect = screen.getByRole('combobox');
    const createButton = screen.getByText('Create Note');

    fireEvent.change(titleInput, { target: { value: 'Test Note' } });
    fireEvent.change(contentTextarea, { target: { value: 'This is a test note.' } });
    fireEvent.change(labelSelect, { target: { value: 'work' } });

    fireEvent.click(createButton);

    expect(screen.getByText('Test Note')).toBeInTheDocument();
    expect(screen.getByText('This is a test note.')).toBeInTheDocument();
  });

  test('updates an existing note', () => {
    render(<StickyNotes />);

    const sampleNoteTitle = 'Sample Note 1';

    const noteTitleElement = screen.getByText(sampleNoteTitle);
    fireEvent.click(noteTitleElement);

    const editTitleInput = screen.getByDisplayValue(sampleNoteTitle);
    const editContentTextarea = screen.getByDisplayValue('Content for note 1');

    fireEvent.change(editTitleInput, { target: { value: 'Updated Note Title' } });
    fireEvent.change(editContentTextarea, { target: { value: 'Updated note content.' } });

    const saveButton = screen.getByText('Save');
    fireEvent.click(saveButton);

    expect(screen.getByText('Updated Note Title')).toBeInTheDocument();
    expect(screen.getByText('Updated note content.')).toBeInTheDocument();

    expect(screen.queryByText(sampleNoteTitle)).not.toBeInTheDocument();
    expect(screen.queryByText('Content for note 1')).not.toBeInTheDocument();
  });

  test('deletes a note', () => {
    render(<StickyNotes />);

    const sampleNoteTitle = 'Sample Note 2';

    const noteTitleElement = screen.getByText(sampleNoteTitle);
    const noteItem = noteTitleElement.closest('.note-item');
    expect(noteItem).toBeInTheDocument();

    const deleteButton = within(noteItem!).getByText('x');

    fireEvent.click(deleteButton);

    expect(screen.queryByText(sampleNoteTitle)).not.toBeInTheDocument();
  });

  test('toggles a note as favorite', () => {
    render(<StickyNotes />);

    const sampleNoteTitle = 'Sample Note 1';
    expect(screen.getByText(sampleNoteTitle)).toBeInTheDocument();

    const noteTitleElement = screen.getByText(sampleNoteTitle);
    const noteItem = noteTitleElement.closest('.note-item');

    expect(noteItem).toBeInTheDocument();

    const favoriteButton = within(noteItem!).getByText('❤️');

    fireEvent.click(favoriteButton);

    expect(within(noteItem!).getByText('💔')).toBeInTheDocument();

    const favoritesSection = screen.getByText('Favorite Notes:').nextElementSibling!;
    expect(within(favoritesSection).getByText(sampleNoteTitle)).toBeInTheDocument();

    fireEvent.click(within(noteItem!).getByText('💔'));

    expect(within(favoritesSection).queryByText(sampleNoteTitle)).not.toBeInTheDocument();
  });

  test('displays favorite notes in the favorites section', () => {
    render(<StickyNotes />);

    const sampleNoteTitle = 'Sample Note 3';

    const noteTitleElement = screen.getByText(sampleNoteTitle);
    const noteItem = noteTitleElement.closest('.note-item');

    expect(noteItem).toBeInTheDocument();

    const favoriteButton = within(noteItem!).getByText('❤️');
    fireEvent.click(favoriteButton);


    const favoritesSection = screen.getByText('Favorite Notes:').nextElementSibling!;
    expect(within(favoritesSection).getByText(sampleNoteTitle)).toBeInTheDocument();
  });
});