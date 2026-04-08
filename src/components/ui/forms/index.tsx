import { lazy } from "react";

const Badge = lazy(() => import("./Badge"))
const Button = lazy(() => import("./Button"))
const Checkbox = lazy(() => import("./Checkbox"))
const DatePicker = lazy(() => import("./date-picker"))
const FormSelect = lazy(() => import("./FormSelect"))
const Input = lazy(() => import("./InputField"))
const Label = lazy(() => import("./Label"))
const Radio = lazy(() => import("./Radio"))
const Select = lazy(() => import("./Select"))
const Switch = lazy(() => import("./Switch"))
const TextArea = lazy(() => import("./TextArea"))
const ImageUpload = lazy(() => import("./ImageUpload"))

export { Badge, Button, Checkbox, DatePicker, FormSelect, Input, Label, Radio, Select, Switch, TextArea, ImageUpload }