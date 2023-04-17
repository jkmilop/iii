import { useFormik } from 'formik';
import * as Yup from "yup";
import { Button, FormGroup, TextField } from '@mui/material';
import React, { useEffect, useState } from "react";

const validationSchema = Yup.object().shape({
    nombre: Yup.string()
        .min(2, "El nombre debe contener al menos dos letras")
        .required("El nombre es obligatorio"),
    cedula: Yup.number()
        .min(8, "La cedula debe contener al menos 8 digitos")
        .required("La cedula es obligatorio"),
    correo: Yup.string().email().
    required("El correo es obligatorio"),
    telefono: Yup.number()
        .required("El número de teléfono es obligatorio")
        .positive("Él número de telefeno es invalido"),
    contraseña: Yup.string()
    .required('La contraseña es obligatoria'),
    });

const RegistroCliente = () => {
    const [cliente, setCliente] = useState({ });
    
    const formik = useFormik({
        initialValues: {
            nombre: '',
            correo: '',
            telefono: '',
            cedula: '',
            contraseña: 'foobar',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <FormGroup>
                    <TextField name="nombre" id="nombre" label="Nombre" variant="outlined" value={formik.values.nombre} onChange={formik.handleChange} error={formik.touched.nombre && Boolean(formik.errors.nombre)} helperText={formik.touched.nombre && formik.errors.nombre} />
                </FormGroup><br />
                <FormGroup>
                    <TextField name="cedula" id="cedula" label="Cedula" variant="outlined" value={formik.values.cedula} onChange={formik.handleChange} error={formik.touched.cedula && Boolean(formik.errors.cedula)} helperText={formik.touched.cedula && formik.errors.cedula} />
                </FormGroup><br />
                <FormGroup>
                    <TextField name="telefono" id="telefono" label="Telefono" variant="outlined" value={formik.values.telefono} onChange={formik.handleChange} error={formik.touched.telefono && Boolean(formik.errors.telefono)} helperText={formik.touched.telefono && formik.errors.telefono} />
                </FormGroup><br />
                <FormGroup>
                    <TextField name="correo" id="correo" label="correo" variant="outlined" value={formik.values.nombre} onChange={formik.handleChange} error={formik.touched.correo && Boolean(formik.errors.correo)} helperText={formik.touched.correo && formik.errors.correo} />
                </FormGroup>
                <br />
                <FormGroup>
                    <TextField name="contraseña" id="contraseña" label="Contraseña" variant="outlined"  type="password" value={formik.values.nombre} onChange={formik.handleChange} error={formik.touched.contraseña && Boolean(formik.errors.contraseña)} helperText={formik.touched.contraseña && formik.errors.contraseña} />
                </FormGroup>
                <br />

                <Button color="primary" variant="contained" fullWidth type="submit">
                    Registrar
                </Button>
            </form>
        </div>
    );
};

export default RegistroCliente;
