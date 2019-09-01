export interface Information {
    id: number;
    title: string;
    object: string;
    datPost: Date;
    destinataire: number;
    ref: string;
    datEven: Date;
    description: string;
    periode: Date;
    file: File;
    admin_id: number;
    niveauEtudes: number[];
    specialites: string[];
    typeInfo: string;
    image: File;
}

export class Info {
    static cm = 'CM';
    static ni = 'NI';
    static ev = 'EVENT';
    static re = 'RE';
    static emp = 'EMP';
}