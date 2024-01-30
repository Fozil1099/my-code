import { objectToFormData } from "@/utils/formmatter";
import { form, attachment, store } from "./AddEducation.vue";

export const saveFiles = async (value: { title: string; files: File[]; }) => {
if (!form.id) {
form.files = value.files;
form.attachment_title = value.title;
} else {
const { id, object_id, content_type } = attachment;
await store.updateTeacherAttachment(
objectToFormData({
id,
object_id,
content_type,
files: form.files?.filter((el) => !el.file_id),
deleted_files: [],
})
);
}
};
