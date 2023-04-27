import {
  Document,
  Paragraph,
  Packer,
  HeadingLevel,
  AlignmentType,
  ImageRun,
} from "docx"
import { saveAs } from "file-saver"

export const generateReport = async (activity) => {
  const cover = await fetch(require(`../uploads/${activity.image}`))
  //* resource person list
  const resPersons = activity.resource_person.map(
    (element) =>
      new Paragraph({
        text: element,
        bullet: {
          level: 0,
        },
      })
  )
  //* Activity for list
  const actFor = activity.activity_for.map(
    (element) =>
      new Paragraph({
        text: element,
        bullet: {
          level: 0,
        },
      })
  )
  //* Activity target list
  const actTarget = activity.activity_target.map(
    (element) =>
      new Paragraph({
        text: element,
        bullet: {
          level: 0,
        },
      })
  )

  const image = new ImageRun({
    data: await cover.blob(),
    transformation: {
      width: 300,
      height: 300,
    },
  })

  let doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            text: activity.activity_title,
            heading: HeadingLevel.HEADING_1,
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({
            children: [image],
          }),
          new Paragraph({
            text: "Activity is organized for",
            alignment: AlignmentType.LEFT,
            heading: HeadingLevel.HEADING_6,
            size: 6,
          }),
          ...actFor,
          new Paragraph({
            text: "Resource persons",
            alignment: AlignmentType.LEFT,
            heading: HeadingLevel.HEADING_6,
            size: 6,
          }),
          ...resPersons,
          new Paragraph({
            text: "Targeted cources",
            alignment: AlignmentType.LEFT,
            heading: HeadingLevel.HEADING_6,
            size: 6,
          }),
          ...actTarget,
          new Paragraph({
            text: activity.descripsion,
            alignment: AlignmentType.LEFT,
            size: 6,
          }),
        ],
      },
    ],
  })

  saveDocumentToFile(doc, activity.activity_title + ".docx")
}

const saveDocumentToFile = (doc, fileName) => {
  Packer.toBlob(doc).then((blob) => {
    saveAs(blob, fileName)
  })
}
